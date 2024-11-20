import { auth } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const getHeaders = () => {
  const token = auth.getToken();
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const api = {
  register: async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'http://localhost:3000'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({
          error: `Registration failed with status ${response.status}`
        }));
        throw new Error(data.error || 'Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  login: async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'http://localhost:3000'
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.token) {
        auth.login(data.token, data.username);
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  getAllUsers: async () => {
    const response = await fetchWithAuth('/users');
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch users');
    }
    return await response.json();
  },

  getProfile: async () => {
    try {
      const token = auth.getToken();
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        mode: 'cors',
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Failed to fetch profile: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  },

  connectTwitch: async (twitchUsername: string) => {
    return fetchWithAuth('/connect/twitch', {
      method: 'POST',
      body: JSON.stringify({ twitchUsername }),
    });
  },

  connectDiscord: async (discordUsername: string) => {
    return fetchWithAuth('/connect/discord', {
      method: 'POST',
      body: JSON.stringify({ discordUsername }),
    });
  },

  connectInstagram: async (instagramHandle: string) => {
    return fetchWithAuth('/connect/instagram', {
      method: 'POST',
      body: JSON.stringify({ instagramHandle }),
    });
  },

  connectYoutube: async (youtubeChannel: string) => {
    return fetchWithAuth('/connect/youtube', {
      method: 'POST',
      body: JSON.stringify({ youtubeChannel }),
    });
  },

  searchGames: async (query: string): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/games/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to search games with status ${response.status}`);
    }
    
    return response.json();
  },

  connectGame: async (gameName: string, gameDetails: { username: string, gameId: string }) => {
    return fetchWithAuth('/connect/game', {
      method: 'POST',
      body: JSON.stringify({
        gameName,
        gameUsername: gameDetails.username,
        gameId: gameDetails.gameId
      }),
    });
  },

  getUserProfile: async (username: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${username}`, {
        method: 'GET',
        headers: {
          ...getHeaders(),
          'Authorization': `Bearer ${auth.getToken()}`
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Profile not found');
        }
        throw new Error('Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  },

  updatePrivacySettings: async (isPrivate: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/privacy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({ isPrivate }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || `Failed to update privacy settings with status ${response.status}`;
        } catch {
          errorMessage = `Failed to update privacy settings with status ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : { message: 'Privacy settings updated', isPrivate };
    } catch (error) {
      console.error('Privacy update error:', error);
      throw error;
    }
  },

  disconnectInstagram: async () => {
    return fetchWithAuth('/disconnect/instagram', {
      method: 'POST'
    });
  },

  disconnectYoutube: async () => {
    return fetchWithAuth('/disconnect/youtube', {
      method: 'POST'
    });
  },

  disconnectGame: async (gameName: string) => {
    return fetchWithAuth('/disconnect/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameName }),
    });
  },

  followUser: async (username: string) => {
    const response = await fetchWithAuth(`/follow/${username}`, {
      method: 'POST',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to follow user');
    }
    return await response.json();
  },

  unfollowUser: async (username: string) => {
    const response = await fetchWithAuth(`/unfollow/${username}`, {
      method: 'POST',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to unfollow user');
    }
    return await response.json();
  },

  checkApiHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }
};

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = auth.getToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, { 
      ...options, 
      headers,
      credentials: 'include',
      mode: 'cors',
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
