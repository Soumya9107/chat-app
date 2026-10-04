import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    ischeckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        set({ ischeckingAuth: true });

        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data });
            get().connectSocket(res.data);
        } catch (error) { 
            console.error('Error checking auth:', error);
            set({ authUser: null });
        } finally {
            set({ ischeckingAuth: false });
        }
    },

    clearAuth: () => {
        set({ authUser: null, ischeckingAuth: false, onlineUsers: [] });
        get().disconnectSocket();
    },
    connectSocket: (user) => {
        if (!user || get().socket?.connected) return;
        
        const socket = io(BASE_URL, {
            query: { userId: user._id },
        })
        set({ socket: socket });
        
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            socket.disconnect();
            set({ socket: null });
        }
    },
}));