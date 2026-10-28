insert into public.course_sheets(id) values ('unity-lighting') on conflict (id) do nothing;
insert into public.tip_revisions(sheet_id) values ('unity-lighting') on conflict (sheet_id) do nothing;
