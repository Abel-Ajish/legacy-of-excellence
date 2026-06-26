const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || '';
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || '';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

export interface Message {
  id: string;
  name: string;
  message: string;
  role: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

function parseFirestoreDoc(doc: any): Message {
  const fields = doc.fields || {};
  return {
    id: doc.name?.split('/').pop() || '',
    name: fields.name?.stringValue || '',
    message: fields.message?.stringValue || '',
    role: fields.role?.stringValue || '',
    status: fields.status?.stringValue || 'pending',
    createdAt: fields.createdAt?.stringValue || '',
  };
}

export async function getMessages(status?: string): Promise<Message[]> {
  let url = `${FIRESTORE_BASE}/messages?key=${FIREBASE_API_KEY}`;
  if (status) {
    url += `&orderByField=status&orderByValue=${status}`;
  }
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  if (!data.documents) return [];
  return data.documents.map(parseFirestoreDoc);
}

export async function addMessage(name: string, message: string, role: string): Promise<Message | null> {
  const url = `${FIRESTORE_BASE}/messages?key=${FIREBASE_API_KEY}`;
  const doc = {
    fields: {
      name: { stringValue: name },
      message: { stringValue: message },
      role: { stringValue: role },
      status: { stringValue: 'pending' },
      createdAt: { stringValue: new Date().toISOString() },
    },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return parseFirestoreDoc(data);
}

export async function updateMessageStatus(id: string, status: 'accepted' | 'rejected'): Promise<boolean> {
  const url = `${FIRESTORE_BASE}/messages/${id}?key=${FIREBASE_API_KEY}`;
  const body = {
    fields: {
      status: { stringValue: status },
    },
  };
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.ok;
}
