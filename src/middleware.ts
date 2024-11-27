import { getSession } from '@/actions/auth';
import { NextRequest, NextResponse } from 'next/server';

type Role = 'SuperAdmin' | 'Farmacia' | 'Bodega' | 'Odontologia' | 'Nutricion' | 'Medicos' | 'Enfermeria' | 'Laboratorio' | 'Direccion';

const permissions: Record<Role, string[]> = {
    SuperAdmin: ['/'],
    Farmacia: ['/inventory', '/transaction', '/tickets'],
    Bodega: ['/inventory', '/category', '/transaction', '/acquisitions', '/departures'],
    Odontologia: ['/departures', '/patients'],
    Nutricion: ['/patients', '/departures'],
    Medicos: ['/patients', '/departures'],
    Enfermeria: ['/patients', '/departures'],
    Laboratorio: ['/laboratory', '/request'],
    Direccion: ['/'],
};

export async function middleware(request: NextRequest) {
    if (request.url === new URL('/', request.url).toString()) {
        return NextResponse.next();
    }
    const session = await getSession();


    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const userRole = session.role as Role;
    const userPermissions = permissions[userRole] || [];


    const hasPermission = userPermissions.some(route => request.url.includes(route));


    if (!hasPermission) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/',
};
