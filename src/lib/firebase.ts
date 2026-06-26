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

function toFirestoreFields(msg: { name: string; message: string; role: string; status: string; createdAt: string }) {
  return {
    fields: {
      name: { stringValue: msg.name },
      message: { stringValue: msg.message },
      role: { stringValue: msg.role },
      status: { stringValue: msg.status },
      createdAt: { stringValue: msg.createdAt },
    },
  };
}

export async function getMessages(status?: string): Promise<Message[]> {
  try {
    const url = `${FIRESTORE_BASE}/messages?key=${FIREBASE_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.documents) return [];
    const all = data.documents.map(parseFirestoreDoc);
    if (status) {
      return all.filter((m: Message) => m.status === status);
    }
    return all;
  } catch {
    return [];
  }
}

export async function addMessage(name: string, message: string, role: string): Promise<Message | null> {
  try {
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
  } catch {
    return null;
  }
}

export async function getMessageById(id: string): Promise<Message | null> {
  try {
    const url = `${FIRESTORE_BASE}/messages/${id}?key=${FIREBASE_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return parseFirestoreDoc(data);
  } catch {
    return null;
  }
}

export async function updateMessageStatus(id: string, status: 'accepted' | 'rejected'): Promise<Message | null> {
  try {
    // Get current document
    const current = await getMessageById(id);
    if (!current) return null;

    // PUT the full document back with updated status
    const url = `${FIRESTORE_BASE}/messages/${id}?key=${FIREBASE_API_KEY}`;
    const doc = toFirestoreFields({
      name: current.name,
      message: current.message,
      role: current.role,
      status: status,
      createdAt: current.createdAt,
    });

    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return parseFirestoreDoc(data);
  } catch {
    return null;
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  try {
    const url = `${FIRESTORE_BASE}/messages/${id}?key=${FIREBASE_API_KEY}`;
    const res = await fetch(url, { method: 'DELETE' });
    return res.ok;
  } catch {
    return false;
  }
}
