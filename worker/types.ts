export interface Env {
  CHATROOM: DurableObjectNamespace;
  AI: any;
}

export interface DurableObjectState {
  storage: {
    get<T>(key: string): Promise<T | undefined>;
    put(key: string, value: any): Promise<void>;
  };
}

export interface DurableObjectNamespace {
  idFromName(name: string): DurableObjectId;
  get(id: DurableObjectId): DurableObjectStub;
}

export interface DurableObjectId {}

export interface DurableObjectStub {
  fetch(request: Request | string, init?: RequestInit): Promise<Response>;
}
