/* Kilcullen Cabs — site data. Edit contact details, destinations and fares here. */

window.KC_CONFIG = {
  phoneDisplay: "089 245 8888", // mobile — main booking line
  phoneTel: "+353892458888",
  landlineDisplay: "045 483 333",
  landlineTel: "+35345483333",
  whatsapp: "353892458888", // same mobile; clear this if the number isn't on WhatsApp
  sms: "+353892458888",
  email: "", // add a bookings email to show email options
  openDays: "7 days a week",
};

/* Popular journeys from Kilcullen. km/min are approximate road figures.
   sign: "motorway" (blue), "national" (green), "tourist" (brown) — styled like Irish road signs.
   x/y: kilometres east/north of Kilcullen, for the service-area map. */
window.KC_PLACES = [
  { id: "dublin-airport", name: "Dublin Airport", ga: "Aerfort Bhaile Átha Cliath", km: 55, min: 51, sign: "motorway", route: "M9 · M7 · M50", x: 33, y: 32.7, airport: true },
  { id: "dublin-city", name: "Dublin City Centre", ga: "Baile Átha Cliath", km: 48, min: 45, sign: "motorway", route: "M9 · M7", x: 32.3, y: 24.2 },
  { id: "heuston", name: "Heuston Station", ga: "Stáisiún Heuston", km: 45, min: 42, sign: "motorway", route: "M9 · M7", x: 30.1, y: 23.9 },
  { id: "carlow", name: "Carlow", ga: "Ceatharlach", km: 41, min: 39, sign: "motorway", route: "M9", x: -12.1, y: -32 },
  { id: "naas", name: "Naas", ga: "An Nás", km: 13, min: 17, sign: "national", route: "R448", x: 5.2, y: 9.4 },
  { id: "newbridge", name: "Newbridge", ga: "An Droichead Nua", km: 9, min: 13, sign: "national", route: "R445", x: -3.5, y: 5.6 },
  { id: "ballymore-eustace", name: "Ballymore Eustace", ga: "An Baile Mór", km: 10, min: 13, sign: "national", route: "R413", x: 8.7, y: 0.4 },
  { id: "old-kilcullen", name: "Old Kilcullen", ga: "", km: 3, min: 5, sign: "national", route: "Local", x: -1.1, y: -2.2 },
  { id: "newbridge-station", name: "Newbridge Station", ga: "Stáisiún an Droichid Nua", km: 10, min: 14, sign: "national", route: "Rail", x: -4.2, y: 6.1 },
  { id: "sallins-station", name: "Sallins & Naas Station", ga: "Na Solláin", km: 18, min: 23, sign: "national", route: "Rail", x: 5.2, y: 12.9 },
  { id: "athy", name: "Athy", ga: "Baile Átha Í", km: 24, min: 29, sign: "national", route: "R418", x: -16.2, y: -15.3 },
  { id: "curragh", name: "Curragh Racecourse", ga: "", km: 11, min: 15, sign: "tourist", route: "Race days", x: -7.9, y: 2 },
  { id: "punchestown", name: "Punchestown Racecourse", ga: "", km: 12, min: 16, sign: "tourist", route: "Race days", x: 6.3, y: 5.8 },
  { id: "kildare-village", name: "Kildare Village", ga: "", km: 15, min: 20, sign: "tourist", route: "Shopping", x: -10.4, y: 3.9 },
];
