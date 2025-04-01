declare global {
  namespace App {
    interface Locals {
      user: {
        uid: string;
        email: string | null;
        isAdmin: boolean;
      } | null;
    }
    // interface Error {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
