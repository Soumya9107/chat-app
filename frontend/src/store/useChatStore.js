import { create } from "zustand";
import { persist } from "zustand/middleware";

import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useChatStore = create(
    persist(
        (set, get) => ({
            users: [],
            conversations: [],
            messages: [],
            selectedUser: null,
            isConversationsLoading: false,
            isUsersLoading: false,
            isMessagesLoading: false,
            activeConversationId: null,
            searchQuery: "",
            sidebarTab: "chats",
            composerText: "",
            isSoundEnabled: true,
            isSendingMedia: false,

            getUsers: async () => {
                set({ isUsersLoading: true });
                try {
                    const res = await axiosInstance.get("/messages/users");
                    set((state) => ({
                        users: res.data,
                        selectedUser:
                            state.selectedUser && res.data.some((user) => user._id === state.selectedUser._id)
                                ? state.selectedUser
                                : null,
                    }));
                } catch (error) {
                    console.log("Error in get Users", error.message);
                } finally {
                    set({ isUsersLoading: false });
                }
            },

            getConversations: async () => {
                set({ isConversationsLoading: true });
                try {
                    const res = await axiosInstance.get("/messages/conversations");
                    set({ conversations: res.data });
                } catch (error) {
                    console.log("Error in getConversations", error.message);
                } finally {
                    set({ isConversationsLoading: false });
                }
            },

            getMessages: async (userId) => {
                if (!userId) return;
                set({ isMessagesLoading: true });
                try {
                    const res = await axiosInstance.get(`/messages/${userId}`);
                    set({ messages: res.data });
                } catch (error) {
                    toast.error(error.response?.data?.message || "Failed to load messages");
                } finally {
                    set({ isMessagesLoading: false });
                }
            },

            sendMessage: async (messageData) => {
                const { selectedUser, messages } = get();
                if (!selectedUser) return false;

                try {
                    const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
                    set({ messages: [...messages, res.data], composerText: "" });
                    get().getConversations();
                    return true;
                } catch (error) {
                    toast.error(error.response?.data?.message || "Failed to send message");
                    return false;
                }
            },

            subscribeToMessages: (userId) => {
                if (!userId) return;

                const socket = useAuthStore.getState().socket;
                if (!socket) return;

                socket.off("newMessage");
                socket.on("newMessage", (newMessage) => {
                    // if im not the receiver don't do anything just return
                    if (String(newMessage.senderId) !== String(userId)) return;

                    set({ messages: [...get().messages, newMessage] });

                    get().getConversations();
                });
            },

            unsubscribeFromMessages: () => {
                const socket = useAuthStore.getState().socket;
                socket?.off("newMessage");
            },

            setSelectedUser: (selectedUser) => set({ selectedUser }),

            setActiveConversationId: (activeConversationId) => {
                set((state) => ({
                    activeConversationId,
                    selectedUser:
                        state.users.find((user) => user._id === activeConversationId) ||
                        state.conversations.find((user) => user._id === activeConversationId) ||
                        null,
                    messages: activeConversationId ? state.messages : [],
                }));
            },

            setSearchQuery: (searchQuery) => set({ searchQuery }),
            setSidebarTab: (sidebarTab) => set({ sidebarTab }),
            setComposerText: (composerText) => set({ composerText }),
            setSoundEnabled: (isSoundEnabled) => set({ isSoundEnabled }),

            sendTextMessage: async (conversationId) => {
                const messageText = get().composerText.trim();
                if (!conversationId || !messageText) return false;

                return get().sendMessage({ text: messageText });
            },

            sendMediaMessage: async ({ conversationId, file }) => {
                if (!conversationId || !file) return false;

                const formData = new FormData();
                formData.append("media", file);

                set({ isSendingMedia: true });
                try {
                    return await get().sendMessage(formData);
                } finally {
                    set({ isSendingMedia: false });
                }
            },
        }),
        {
            name: "imessage-storage",
            partialize: (state) => ({ isSoundEnabled: state.isSoundEnabled }),
        },
    ),
);