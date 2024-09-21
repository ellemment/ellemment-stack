// app/ellemment-ui/components/navigation/nabar-contents.tsx

import { Link } from '@remix-run/react';
import { Container } from '#app/components/ui/container';

const NavbarContents = () => {
    return (
        <nav className="text-inherit py-6">
            <Container>
                <div className="grid grid-cols-1 gap-8">
                    <div className="col-span-1 lg:col-span-1">
                        <h2 className="text-xs font-medium text-muted-foreground mb-4">Explore iPad</h2>
                        <ul className="space-y-2">
                            <li><Link to="/ipad" className="text-xl font-semibold text-inherit hover:text-muted-foreground">Explore All iPad</Link></li>
                            <li><Link to="/ipad-pro" className="text-xl font-semibold text-inherit hover:text-muted-foreground">iPad Pro</Link></li>
                            <li><Link to="/ipad-air" className="text-xl font-semibold text-inherit hover:text-muted-foreground">iPad Air</Link></li>
                            <li><Link to="/ipad" className="text-xl font-semibold text-inherit hover:text-muted-foreground">iPad</Link></li>
                            <li><Link to="/ipad-mini" className="text-xl font-semibold text-inherit hover:text-muted-foreground">iPad mini</Link></li>
                            <li><Link to="/apple-pencil" className="text-xl font-semibold text-inherit hover:text-muted-foreground">Apple Pencil</Link></li>
                            <li><Link to="/keyboards" className="text-xl font-semibold text-inherit hover:text-muted-foreground">Keyboards</Link></li>
                        </ul>
                    </div>
        
                </div>
            </Container>
        </nav>
    );
};

export default NavbarContents;