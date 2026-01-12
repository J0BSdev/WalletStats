import { isAddress as viemIsAddress, getAddress as viemGetAddress } from 'viem';

const STORAGE_KEY = 'walletstats:last_address';

/**
 * Validates an Ethereum address
 */
export function isAddress(address: string): boolean {
  try {
    return viemIsAddress(address);
  } catch {
    return false;
  }
}

/**
 * Normalizes an address to checksum format
 */
export function normalizeAddress(address: string): string {
  try {
    return viemGetAddress(address);
  } catch {
    throw new Error('Invalid address');
  }
}

/**
 * Saves address to localStorage
 */
export function saveAddress(address: string): void {
  try {
    const normalized = normalizeAddress(address);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, normalized);
    }
  } catch (error) {
    // Silently fail if address is invalid
  }
}

/**
 * Loads address from localStorage
 */
export function loadAddress(): string | null {
  if (typeof window === 'undefined') return null;
  const address = localStorage.getItem(STORAGE_KEY);
  return address ? address : null;
}

/**
 * Gets address from URL search params
 */
export function getAddressFromURL(searchParams: URLSearchParams): string | null {
  const address = searchParams.get('address');
  if (!address) return null;
  if (!isAddress(address)) return null;
  try {
    return normalizeAddress(address);
  } catch {
    return null;
  }
}

/**
 * Creates a deterministic hash from address for stub data
 * Uses simple string hash (Fowler–Noll–Vo hash function)
 */
export function hashAddress(address: string): number {
  let hash = 2166136261;
  const normalized = address.toLowerCase();
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0; // Convert to unsigned 32-bit integer
}

