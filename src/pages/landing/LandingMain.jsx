import { useEffect, useState, useRef } from 'react';
import './assets/Landing.css';

const Landing = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [isScrolling, setIsScrolling] = useState(false);
    const requestRef = useRef();
    const timeoutRef = useRef();

    const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
    };

    const handleScroll = () => {
        setIsScrolling(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 1000);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const scrollToSection = (sections, index) => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    };

    const autoScroll = () => {
        if (!isScrolling && isDesktop) {
            const sections = document.querySelectorAll('.section');
            let sectionIndex = 0;

            const scroll = () => {
                scrollToSection(sections, sectionIndex);
                sectionIndex = (sectionIndex + 1) % sections.length;
                requestRef.current = setTimeout(scroll, 3000);
            };

            scroll();
        }
    };

    useEffect(() => {
        if (isDesktop) {
            autoScroll();
        } else {
            if (requestRef.current) {
                clearTimeout(requestRef.current);
            }
        }
    }, [isDesktop, isScrolling]);

    return (
        <div className="container">
            <div className="section bg-primary">1</div>
            <div className="section bg-danger">2</div>
            <div className="section bg-secondary">3</div>
            <div className="section bg-primary">4</div>
            <div className="section bg-danger">5</div>
        </div>
    );
};

export default Landing;
