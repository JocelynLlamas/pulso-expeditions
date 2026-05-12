import FloatingParticles from '../components/landing/FloatingParticles';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import FounderSection from '../components/landing/FounderSection';
import ExperiencesSection from '../components/landing/ExperiencesSection';
import ExpeditionsSection from '../components/landing/ExpeditionsSection';
import MapSection from '../components/landing/MapSection';
import GallerySection from '../components/landing/GallerySection';
import CommunitySection from '../components/landing/CommunitySection';
import FinalCTASection from '../components/landing/FinalCTASection';
import Footer from '../components/landing/Footer';

const IMAGES = {
    hero: 'https://media.base44.com/images/public/6a01e2113636a738b84a5337/96dd3d18e_generated_9ad93486.png',
    about: 'https://media.base44.com/images/public/6a01e2113636a738b84a5337/671f39535_generated_7521180d.png',
    experiences: {
        hiking: 'https://media.base44.com/images/public/6a01e2113636a738b84a5337/270e0efff_generated_761ceead.png',
        rivers: 'https://media.base44.com/images/public/6a01e2113636a738b84a5337/e8a19933b_generated_b432a26b.png',
        mountains: 'https://media.base44.com/images/public/6a01e2113636a738b84a5337/fbe2be4f4_generated_3cd5c40b.png',
        camping: 'https://media.base44.com/images/public/6a01e2113636a738b84a5337/90a7fdf55_generated_55d400ff.png',
        forest: 'https://media.base44.com/images/public/6a01e2113636a738b84a5337/8ca2a4929_generated_ecb68cd9.png',
    },
    expeditions: [
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/840b9f45b_generated_b634b79c.png',
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/1a0b3402c_generated_0226b2dc.png',
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/e63e2ce13_generated_c9f41bdd.png',
    ],
    gallery: [
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/843a67800_generated_3496c01a.png',
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/7e528d370_generated_7f20d9c8.png',
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/1e17d7f31_generated_87da2e5a.png',
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/02e8fc30e_generated_f363cffc.png',
    ],
    community: [
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/8840aad9e_generated_02f86e96.png',
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/f02a89b5a_generated_f4e2684b.png',
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/f48959f3e_generated_0866d8e1.png',
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/d520c0443_generated_2228e03b.png',
        'https://media.base44.com/images/public/6a01e2113636a738b84a5337/2392917b5_generated_52934690.png',
    ],
    cta: 'https://media.base44.com/images/public/6a01e2113636a738b84a5337/2d25d2fbe_generated_caaee477.png',
    founder: '/public/profile.jpeg',
};

export default function Home() {
    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            <FloatingParticles />
            <Navbar />
            <HeroSection heroImage={IMAGES.hero} />
            <AboutSection aboutImage={IMAGES.about} />
            <FounderSection founderImage={IMAGES.founder} />
            <ExperiencesSection images={IMAGES.experiences} />
            <ExpeditionsSection images={IMAGES.expeditions} />
            <MapSection images={IMAGES.expeditions} />
            <GallerySection images={IMAGES.gallery} />
            <CommunitySection images={IMAGES.community} />
            <FinalCTASection bgImage={IMAGES.cta} />
            <Footer />
        </div>
    );
}