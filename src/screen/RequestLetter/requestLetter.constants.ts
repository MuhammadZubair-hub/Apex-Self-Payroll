export const LETTER_SUBJECTS = [
  'Request for Salary Certificate',
  'Request for Salary Certificate (Arabic)',
  'Request for Salary Transfer Certificate',
  'Request for Employment Certificate',
  'Request for Experience Certificate',
  'Request for NOC for Driving',
  'Request for NOC for Travel',
  'Request for Attested Contract',
  'Request for Original Passport (In and Out - Workers)',
];

interface TemplateArgs {
  fullName: string;
  designation: string;
  department: string;
}

const closing = ({ fullName, designation }: TemplateArgs, signOff: string) =>
  `\n\n${signOff},\n${fullName.toUpperCase()}\n${designation}`;

const TEMPLATES: Record<string, (args: TemplateArgs) => string> = {
  'Request for Salary Certificate': (args) =>
    `Dear HR Team,\n\nI hope this message finds you well.\n\nI am writing to kindly request a Salary Certificate for my employment with ${args.department} Department. The certificate is required for [state the purpose, e.g., applying for a loan, visa application, etc.]. I would appreciate it if you could provide me with the document at your earliest convenience.\n\nPlease let me know if any further information or documentation is needed from my side.\n\nThank you for your attention to this matter.` +
    closing(args, 'Best regards'),

  'Request for Salary Transfer Certificate': (args) =>
    `Dear HR Team,\n\nI hope you are doing well.\n\nI am requesting a Salary Transfer Certificate for my employment at ${args.department} Department. The certificate is required for [mention reason, e.g., processing a loan application, completing a banking procedure, etc.].\n\nI would be grateful if you could provide this document at your earliest convenience.\n\nThank you for your prompt attention to this request. Should you need any further details, please feel free to reach out.` +
    closing(args, 'Sincerely'),

  'Request for Employment Certificate': (args) =>
    `Dear [Recipient's Name or HR Team],\n\nI trust this email finds you well.\n\nI am writing to request an Employment Certificate from ${args.department} Department, confirming my employment and job title. This certificate is required for [state the purpose, e.g., applying for a visa, verification purposes, etc.].\n\nKindly process this request at your earliest convenience. Please let me know if there are any additional details or forms you require from me.\n\nThank you for your cooperation.` +
    closing(args, 'Warm regards'),

  'Request for Experience Certificate': (args) =>
    `Dear [Recipient's Name or HR Team],\n\nI hope you are well.\n\nI am requesting an Experience Certificate for my time employed at ${args.department} Department. The certificate is required for [mention purpose, e.g., a job application, further studies, etc.]. Kindly include the details of my role, duration of employment, and any other pertinent information.\n\nI would appreciate your prompt response to this request.\n\nThank you in advance.` +
    closing(args, 'Best regards'),

  'Request for NOC for Driving': (args) =>
    `Dear HR Team,\n\nI hope you are doing well.\n\nI am writing to request a No Objection Certificate (NOC) for my driving license. This document is required as part of the [mention purpose, e.g., renewal of my driving license, legal formalities, etc.].\n\nKindly process my request and provide the necessary certificate at your earliest convenience.\n\nThank you for your attention to this matter.` +
    closing(args, 'Best regards'),

  'Request for NOC for Travel': (args) =>
    `Dear HR Team,\n\nI hope you are doing well.\n\nI am writing to request a No Objection Certificate (NOC) for travel purposes. This document is required as part of [mention purpose, e.g., visa application, travel arrangements, etc.].\n\nKindly process my request and provide the necessary certificate at your earliest convenience.\n\nThank you for your attention to this matter.` +
    closing(args, 'Best regards'),

  'Request for Attested Contract': (args) =>
    `Dear HR Team,\n\nI hope this message finds you well.\n\nI am writing to request an attested copy of my employment contract with ${args.department} Department. This document is required for [state the purpose, e.g., visa processing, legal formalities, etc.].\n\nKindly process my request and provide the attested contract at your earliest convenience.\n\nThank you for your cooperation.` +
    closing(args, 'Best regards'),

  'Request for Original Passport (In and Out - Workers)': (args) =>
    `Dear HR Team,\n\nI hope you are doing well.\n\nI am writing to request the release of my original passport for [mention purpose, e.g., travel, visa renewal, personal use, etc.]. I confirm that I will return the passport promptly once the purpose is fulfilled.\n\nKindly process my request at your earliest convenience.\n\nThank you for your attention to this matter.` +
    closing(args, 'Best regards'),
};

// "(Arabic)" is the same request in a different language variant - shares the English template.
TEMPLATES['Request for Salary Certificate (Arabic)'] = TEMPLATES['Request for Salary Certificate'];

export const buildLetterBody = (subject: string, args: TemplateArgs) => {
  const template = TEMPLATES[subject];
  return template ? template(args) : '';
};
