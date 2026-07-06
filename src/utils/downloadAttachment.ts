import { Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { baseUrl, endPoints } from '../services/Constants/endPoints';
import { showThemedMessage } from './flashMessage';

const getMimeType = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return 'application/pdf';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
};

// Downloads the given server-relative attachment path and opens it in the device's viewer app.
export const downloadAttachment = async (attachmentPath: string | null | undefined, colors: any) => {
  if (!attachmentPath) return;

  const fileName = attachmentPath.split(/[/\\]/).pop() || `attachment_${Date.now()}`;
  const mime = getMimeType(fileName);
  const localPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${fileName}`;
  const url = `${baseUrl}${endPoints.DownloadFileESS}?filePath=${attachmentPath}`;
  console.log('tha attachment path is :', url);
  try {
    // Fetch into memory and write it ourselves instead of using config({ path }) streaming mode -
    // that mode rejects with "Download interrupted." whenever the server's Content-Length header
    // doesn't exactly match the bytes received (chunked/proxied responses trigger this even when
    // the full file arrived fine).
    const res = await ReactNativeBlobUtil.fetch('GET', url);
    const base64Data = res.base64();
    await ReactNativeBlobUtil.fs.writeFile(localPath, base64Data, 'base64');

    if (Platform.OS === 'ios') {
      await ReactNativeBlobUtil.ios.openDocument(localPath);
    } else {
      await ReactNativeBlobUtil.android.actionViewIntent(localPath, mime);
    }
  } catch (error) {
    console.log('error downloading attachment', error);
    showThemedMessage(colors, { message: 'Failed to download attachment', type: 'danger' });
  }
};
