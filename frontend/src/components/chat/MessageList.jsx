import useScrollToBottom from "../../hooks/useScrollToBottom";
import { MessageBubble } from "./MessageBubble";
import { NoConversationPlaceholder } from "./NOConversationPlaceholder";
import { useSelectedConversation } from "../../hooks/useSelectedConversation";

export function MessageList() {
    const { activeConversation, activeConversationId } = useSelectedConversation();

    const lastMessageId = activeConversation?.messages.at(-1)?.id;
    const messagesScrollRef = useScrollToBottom(activeConversationId, lastMessageId);

    return (
        <div className="relative flex flex-1 flex-col overflow-hidden">
            {activeConversation ? (
                <div
                    ref={messagesScrollRef}
                    className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-2 py-3 sm:px-3 sm:py-4"
                >
                    <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-wide text-muted">
                        Today
                    </p>
                    {activeConversation.messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                </div>
            ) : (
                <NoConversationPlaceholder />
            )}
        </div>
    );
}