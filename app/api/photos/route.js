import { NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server'

const API_BASE_URL = process.env.API_BASE_URL;

const supabase = createRouteLoader

// export async function GET() {
//     const res = await fetch(`${API_BASE_URL}/images/read.php`);
    
//     const photos = await res.json();
    
//     return NextResponse.json(photos, {
//         status: 200
//     })
// }

export async function POST(request) {
    const photo = await request.json();
    
    // get supabase instanceconst cookieStore = await cookies()
    const supabase = createClient(cookieStore);

    // get the current user session
    const { data: { session } } = await supabase.auth.getSession();
    
    // insert the data
    //  TODO: refactor to upload photo
    const { data, error } = await supabase.from('photos').select() //'photos' = name of table
        .insert({
            ...photo,
            // user_email: session.user.email //if available ?
        })

    return NextResponse.json({ data, error })

    // const res = await fetch(`${API_BASE_URL}/images/upload.php`,{
    //     method: 'POST',
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(photo)
    // });
    
    // const newPhoto = await res.json();
    
    // return NextResponse.json(newTicket, {
    //     status: 201 //added new resource
    // })
}