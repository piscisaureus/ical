let cal_event = ical`
BEGIN:VCALENDAR
PRODID:-//piscisaureus//Deno Calendar Generator//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:20201015T200000Z
DTEND:20201015T210000Z
DTSTAMP:20200902T210743Z
ORGANIZER;CN=bert@deno.land:mailto:bert@deno.land
UID:3kq34q8e9idp00162i88p2lrxx@deno.land
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;
 RSVP=TRUE;CN=bert@deno.land:mailto:bert@deno.land
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;
 RSVP=FALSE;CN="Cow":mailto:cow@deno.land
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;
 RSVP=TRUE;CN="Chicken":mailto:chicken@deno.land
CREATED:20200902T210741Z
DESCRIPTION:It was a short story but he told it long.
LAST-MODIFIED:20200902T210742Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Summarily tested event
TRANSP:OPAQUE
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:This is an event reminder
TRIGGER:-P0DT0H15M0S
END:VALARM
END:VEVENT
END:VCALENDAR
`;

function ical(tpl, ...ins) {
  return tpl.raw
    .map((s, i) => `${s}${i in ins ? ins[i] : ""}`)
    .join("")
    .trim()
    .split(/\r?\n/)
    .map((l) => `${l}\r\n`)
    .join("");
}

const headers = {
  "content-type": "text/calendar;charset=utf-8",
  // Tell the user agent to never cache this response.
  "cache-control": "private, no-cache, no-store, must-revalidate",
  expires: "Sat, 01 Jan 2000 00:00:00 GMT",
  pragma: "no-cache",
  vary: "*",
};

async function respond(request) {
  return new Response(cal_event, {
    status: 200,
    headers,
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(respond(event.request));
});
