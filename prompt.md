Je veux changer la façon dont on navigue dans mon application..
Voici mes sections :

1. Nav Bar (section[id="avant-programme"]) dans [BeforeProgramSection](./src/components/wedding/BeforeProgramSection.tsx)
2. Accueil (section[id="accueil"]) dans [HeroSection](./src/components/wedding/HeroSection.tsx)
3. Programme (section[id="programme"]) dans [ProgramSection](./src/components/wedding/ProgramSection.tsx)
4. Rsvp (section[id="rsvp"]) dans [RsvpSection](./src/components/wedding/RsvpSection.tsx)
5. Info (section[id="infos"]) dans [InfoSection](./src/components/wedding/InfoSection.tsx)

## Navigation

1. Je veux que lorsque l'on ouvre le page, on atterit sur (2. Accueil)
2. losqu'on scroll ou clique sur le button[id="scroll-to-nav"], on arrive directement au niveau de section[id="avant-programme"]
3. Arrivé ici le scrolling global s'arrête et on bascule en mode navigation via la nav bar.
4. le scrolling activé ici doit etre celui des onglets de la navbar
