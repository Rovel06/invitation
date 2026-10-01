alter table rsvp_responses
  add column if not exists phone_number text,
  add column if not exists relationship text;
