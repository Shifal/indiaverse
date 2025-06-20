const mockData = {
  "Andhra Pradesh": {
    Trends: ["#AmaravatiGrowth", "#APEducationReforms"],
    Jobs: ["Software Engineer at Wipro", "Project Manager in Vijayawada"],
    Startups: ["FinTech Bengaluru-AP hub", "AgriTech in Guntur"],
    Videos: ["AP Tourism Vlog", "Cultural Festival Highlights"],
  },
  "Arunachal Pradesh": {
    Trends: ["#TawangMonastery", "#ZiroFestival"],
    Jobs: ["Wildlife Biologist in Itanagar", "Eco‑tourism Manager"],
    Startups: ["Handloom Online Co-op"],
    Videos: ["Himalayan Drone Views", "Tribal Dance Clip"],
  },
  "Assam": {
    Trends: ["#TeaGardenTour", "#Bihu2025"],
    Jobs: ["Software Dev at Guwahati Startups", "Tea Estate Manager"],
    Startups: ["Eco‑Tourism Assam"],
    Videos: ["River Brahmaputra Cruise", "Bihu Dance Performance"],
  },
  "Bihar": {
    Trends: ["#NITPatna", "#ChhathFestival"],
    Jobs: ["IT Recruiter Patna", "Govt Exam Coaching Centre"],
    Startups: ["EdTech in Bihar"],
    Videos: ["Chhath Puja Rituals", "Historic Bihar Tours"],
  },
  "Chhattisgarh": {
    Trends: ["#BastarDussehra", "#ChhattisgarhCulture"],
    Jobs: ["Mining Engineer", "Govt Contractor"],
    Startups: ["Tribal Handicraft E‑commerce"],
    Videos: ["Waterfall Drone Footage"],
  },
  "Goa": {
    Trends: ["#GoaBeaches", "#Carnival2025"],
    Jobs: ["Hospitality Manager", "Freelance Photographer"],
    Startups: ["Beach Cleanup NGO"],
    Videos: ["Goa Carnival Highlights"],
  },
  "Gujarat": {
    Trends: ["#StatueOfUnity", "#Garba2025"],
    Jobs: ["Petrochemical Engineer", "Garment Export Manager"],
    Startups: ["Agri‑Processing Startup"],
    Videos: ["Folk Dance in Gujarat"],
  },
  "Haryana": {
    Trends: ["#GurugramTechPark", "#HaryanaWrestling"],
    Jobs: ["Tech Recruiter", "Agriculture Officer"],
    Startups: ["Fitness Tech Haryana"],
    Videos: ["Wrestling Championship Highlights"],
  },
  "Himachal Pradesh": {
    Trends: ["#ManaliTourism", "#DharamshalaFeels"],
    Jobs: ["Trekking Guide", "Climate Researcher"],
    Startups: ["Eco‑Tourism HP"],
    Videos: ["Snow Trekking Vlog"],
  },
  "Jharkhand": {
    Trends: ["#RanchiRockGarden", "#CoalMining"],
    Jobs: ["Mining Engineer", "Data Analyst"],
    Startups: ["Rural Education Initiative"],
    Videos: ["Jharkhand Tribal Festival"],
  },
  "Karnataka": {
    Trends: ["#BangaloreTraffic", "#StartupIndia"],
    Jobs: ["Node.js Dev at Infosys", "Full Stack at Flipkart"],
    Startups: ["New SaaS in Bangalore", "EdTech boom"],
    Videos: ["Bangalore Drone View", "Karnataka Elections"],
  },
  "Kerala": {
    Trends: ["#GodsOwnCountry", "#KeralaBackwaters"],
    Jobs: ["Tourism Dev", "Marine Biologist"],
    Startups: ["Ayurveda Wellness"],
    Videos: ["Houseboat Tours", "Onam Celebrations"],
  },
  "Madhya Pradesh": {
    Trends: ["#KhajurahoTemples", "#MPFolkDances"],
    Jobs: ["Archaeologist", "Forest Ranger"],
    Startups: ["Heritage Tourism MP"],
    Videos: ["Khajuraho Aerial View"],
  },
  "Maharashtra": {
    Trends: ["#MumbaiRains", "#Bollywood"],
    Jobs: ["React Dev at TCS", "Backend at Razorpay"],
    Startups: ["Zepto raises funding", "Mumbai FinTech"],
    Videos: ["Monsoon in Mumbai", "Bollywood Reel"],
  },
  "Manipur": {
    Trends: ["#HornbillFestival", "#LoktakLake"],
    Jobs: ["Tourism Officer", "Game Developer"],
    Startups: ["Handloom Export"],
    Videos: ["Hornbill Festival Highlights"],
  },
  "Meghalaya": {
    Trends: ["#LivingRootBridges", "#ShillongWeather"],
    Jobs: ["Environmental Scientist", "Tour Guide"],
    Startups: ["Eco‑Lodges"],
    Videos: ["Root Bridges Drone"],
  },
  "Mizoram": {
    Trends: ["#ChapcharKut", "#AizawlViews"],
    Jobs: ["NGO Coordinator", "Education Specialist"],
    Startups: ["PeaceTech NGO"],
    Videos: ["ChapcharKut Festival"],
  },
  "Nagaland": {
    Trends: ["#HornbillNagaland", "#KohimaWarCemetery"],
    Jobs: ["Cultural Archivist", "Travel Planner"],
    Startups: ["Ethnic Art Ecommerce"],
    Videos: ["Hornbill Festival 2025"],
  },
  "Odisha": {
    Trends: ["#JagannathPuri", "#KonarkSunTemple"],
    Jobs: ["Temple Tour Manager", "Art Restorer"],
    Startups: ["Handloom Odisha"],
    Videos: ["Puri Rath Yatra"],
  },
  "Punjab": {
    Trends: ["#Vaisakhi2025", "#AmritsarLangar"],
    Jobs: ["Agri Analyst", "Food Processing"],
    Startups: ["AgriTech Punjab"],
    Videos: ["Golden Temple Tour"],
  },
  "Rajasthan": {
    Trends: ["#DesertFestival", "#JaipurLiteratureFest"],
    Jobs: ["Frontend Dev Jaipur", "Govt Jobs"],
    Startups: ["Handicraft eCommerce", "AgriTech"],
    Videos: ["Tourism Drone View", "Pushkar Fair Highlights"],
  },
  "Sikkim": {
    Trends: ["#Kanchenjunga", "#EcoTourism"],
    Jobs: ["Adventure Guide", "Conservationist"],
    Startups: ["Organic Farming"],
    Videos: ["Mountain Sunrise"],
  },
  "Tamil Nadu": {
    Trends: ["#MaduraiMeenakshi", "#ChennaiBeaches"],
    Jobs: ["Tamil Dev at Zoho", "UX Designer"],
    Startups: ["EdTech Chennai"],
    Videos: ["Temple Architecture"],
  },
  "Telangana": {
    Trends: ["#HyderabadITHub", "#Charminar"],
    Jobs: ["Data Scientist", "Blockchain Dev"],
    Startups: ["FinTech Hyderabad"],
    Videos: ["Charminar Drone"],
  },
  "Tripura": {
    Trends: ["#UjjayantaPalace", "#CulturalFest"],
    Jobs: ["Tour Guide", "Cultural Promoter"],
    Startups: ["Handicraft Export"],
    Videos: ["Palace Drone View"],
  },
  "Uttar Pradesh": {
    Trends: ["#Kumbh2025", "#VaranasiGanga"],
    Jobs: ["Tourism Coordinator", "Tour Guide"],
    Startups: ["Spiritual Tours UP"],
    Videos: ["Ganga Aarti"]
  },
  "Uttarakhand": {
    Trends: ["#Devbhumi", "#YogaRetreat"],
    Jobs: ["Mountain Guide", "Wellness Coach"],
    Startups: ["Yoga Retreat Center"],
    Videos: ["Himalayan Drone Trek"]
  },
  "West Bengal": {
    Trends: ["#DurgaPuja", "#KolkataMetro"],
    Jobs: ["Data Analyst", "Media Planner"],
    Startups: ["EdTech Kolkata"],
    Videos: ["Durga Puja Immersion"]
  },

  /* Union Territories */
  "Andaman and Nicobar Islands": {
    Trends: ["#PortBlairBeaches"],
    Jobs: ["Marine Biologist", "Tour Guide"],
    Startups: ["Eco‑Tourism"],
    Videos: ["Island Life Vlog"],
  },
  "Chandigarh": {
    Trends: ["#ModernCity", "#LeCorbusierArchitecture"],
    Jobs: ["Urban Planner", "Govt Jobs"],
    Startups: ["SmartCity Tech"],
    Videos: ["City Tour"],
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    Trends: ["#IslandFest", "#TribalCulture"],
    Jobs: ["Tourism Officer"],
    Startups: ["Handicraft Export"],
    Videos: ["Drone Tour"],
  },
  "Delhi": {
    Trends: ["#DelhiPolitics", "#NewDelhiFood"],
    Jobs: ["Policy Analyst", "Food Blogger"],
    Startups: ["FoodTech Delhi"],
    Videos: ["Street Food Tour"],
  },
  "Jammu and Kashmir": {
    Trends: ["#SummerCapital", "#SrinagarLake"],
    Jobs: ["Tour Guide", "Govt Jobs"],
    Startups: ["Tourism Startup"],
    Videos: ["Srinagar Shikara"],
  },
  "Ladakh": {
    Trends: ["#LehLadakh", "#PangongTso"],
    Jobs: ["Hospitality in Leh", "Adventure Guide"],
    Startups: ["Trekking Agency"],
    Videos: ["Pangong Tso Views"],
  },
  "Lakshadweep": {
    Trends: ["#LakshadweepIslands", "#ScubaDiving"],
    Jobs: ["Marine Guide", "Environmentalist"],
    Startups: ["Eco‑Tourism"],
    Videos: ["Underwater World"],
  },
  "Puducherry": {
    Trends: ["#FrenchQuarters", "#Auroville"],
    Jobs: ["Yoga Teacher", "Tour Operator"],
    Startups: ["Wellness Tourism"],
    Videos: ["Beachside Serenity"],
  },
};

export default mockData;