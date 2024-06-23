const { NextResponse } = require("next/server")
import db from '@/lib/db';
import bcrypt from 'bcryptjs';


export async function POST(req:Request) {
    const data = await req.json();
    
    const usernameFound = await db.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (usernameFound) {
        return NextResponse.json({
            error: "Email already exists"
        },
        {
            status: 400
        }
        
    )
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.user.create({
        data: {
            fullName: data.username,
            email: data.email,
            password: hashedPassword,
            client: {
                create:{

                }
            }
        }
    });

    const {password, ...user} = newUser;
    return NextResponse.json(newUser)
    
}