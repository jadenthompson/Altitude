// src/components/CrewNotesWidget.jsx
import React, { useEffect, useState } from 'react';
import { StickyNote } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

const CrewNotesWidget = () => {
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from('crew_notes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) console.error('Crew note error:', error.message);
      else setNote(data?.note || '');
    };

    fetchNote();
  }, []);

  return (
    <div className="rounded-2xl shadow-md p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
      <h2 className="font-semibold text-lg flex items-center gap-2 mb-1">
        <StickyNote className="w-5 h-5" /> Crew Note
      </h2>
      {note ? (
        <p className="text-sm text-gray-700 dark:text-gray-300">{note}</p>
      ) : (
        <p className="text-sm text-gray-400 italic">No notes yet.</p>
      )}
    </div>
  );
};

export default CrewNotesWidget;
