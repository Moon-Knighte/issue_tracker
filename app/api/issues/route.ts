import { NextRequest, NextResponse } from 'next/server'
import { title } from 'process';
import { z } from 'zod';
import prisma from '@/prisma/client';

//we can now validate the body of schema using zod

const createIssueSchema = z.object({
     title: z.string().min(1).max(255),
     description: z.string().min(1)
})

 export async function POST (request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400});
   //400 meant bad request from client
 
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description}
    });

    return NextResponse.json(newIssue, { status: 201});
    //201 means object is created
 }