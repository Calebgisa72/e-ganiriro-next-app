'use client';

import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { submmitPost } from './actions';
import UserAvatar from '@/src/components/ui/UserAvatar';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button } from '@/src/components/ui/button';
import './styles.css';

const PostEditor = () => {
  const { currentUser } = useSelector((state: RootState) => state.session);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false
      }),
      Placeholder.configure({
        placeholder: 'Make a new post ...'
      })
    ]
  });

  const input =
    editor?.getText({
      blockSeparator: '\n'
    }) || '';

  async function onSubmit() {
    await submmitPost(input);
    editor?.commands.clearContent();
  }
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={currentUser?.user?.profilePic} classname="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="w-full max-h-[20rem] overflow-y-auto bg-muted rounded-2xl px-5 py-3"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={!input.trim()} className="min-w-20">
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
