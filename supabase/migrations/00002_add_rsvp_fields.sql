alter table rsvp_responses
  add column if not exists email text,
  add column if not exists drink_preference text;
