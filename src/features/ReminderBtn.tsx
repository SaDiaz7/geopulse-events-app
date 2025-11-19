import { useAddReminder } from '@/hooks/useReminders';

export default function ReminderBtn({ eventId, whenISO }: { eventId: string; whenISO: string }) {
  const add = useAddReminder();
  return (
    <button onClick={() => add.mutate({ event_id: eventId, remind_at: whenISO })}
      className="px-2 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-sm">
      Recordarme
    </button>
  );
}
