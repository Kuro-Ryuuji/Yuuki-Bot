// © Elaina-MD | https://github.com/OmmniDevv/Elaina-MD
// lib/gdrive.js - Google Drive integration (disabled, googleapis not installed)
// Install googleapis jika ingin menggunakan: npm install googleapis

export class GoogleAuth {
  constructor() {}
  async authorize() { throw new Error('googleapis not installed') }
}

export class GoogleDrive extends GoogleAuth {
  constructor() { super() }
}
