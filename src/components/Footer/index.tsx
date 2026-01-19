import React from 'react';
import { Mail, MapPin, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import AISLogo from '@/assets/logo/AIS_logo.png';
import SeoulTechLogo from '@/assets/logo/Logo_seoultech_bar.jpg';
import './Footer.css';

const Footer = () => {
    const { theme, setTheme } = useTheme();

    return (
        <footer className="footer-root">
            <div className="footer-container">
                <div className="footer-inner">

                    {/* Left: AIS Lab Logo */}
                    <div className="footer-left-logo">
                        <img
                            src={AISLogo}
                            alt="AIS Lab Logo"
                            className="footer-logo"
                        />
                    </div>

                    {/* Center: Info Content */}
                    <div className="footer-center-info">
                        <h3 className="footer-title">Autonomous Intelligent Systems Lab</h3>
                        <div className="footer-info-wrapper">
                            <div className="footer-contact-item">
                                <MapPin size={14} className="text-muted-foreground" />
                                <span>Room 702, Frontier Hall (#32)</span>
                            </div>
                            <div className="footer-contact-item">
                                <Mail size={14} className="text-muted-foreground" />
                                <span>jeha@seoultech.ac.kr</span>
                            </div>
                            <div className="footer-divider-hidden sm:block">|</div>
                            <a
                                href="https://www.seoultech.ac.kr/sinfo/persnal/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-legal-link"
                            >
                                개인정보처리방침
                            </a>
                            <div className="footer-divider-hidden sm:block">|</div>
                            <span>
                                &copy; {new Date().getFullYear()} AIS Lab. All rights reserved.
                            </span>
                        </div>
                    </div>

                    {/* Right: Theme Toggle & SeoulTech Logo */}
                    <div className="footer-right-logo">
                        <img
                            src={SeoulTechLogo}
                            alt="SeoulTech Logo"
                            className="footer-logo"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;