import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

function PromoPage() {
    const [promoImageUrl, setPromoImageUrl] = useState("");
    const auth = getAuth();

    useEffect(() => {
        const fetchPromoImage = async () => {
            const user = auth.currentUser;

            // ดึง URL ของภาพจาก Realtime Database
            const db = getDatabase();
            const promoRef = ref(db, `promotionImage/${user.uid}`);
            const snapshot = await get(promoRef);
            
            if (snapshot.exists()) {
                setPromoImageUrl(snapshot.val().imageUrl); // แสดง URL ของภาพโปรโมชัน
            } else {
                console.log("No promo image found.");
            }
        };

        if (auth.currentUser) {
            fetchPromoImage();
        }
    }, [auth]);

    return (
        <div>
            <h2>Promotion Page</h2>
            {promoImageUrl ? (
                <div>
                    <img src={promoImageUrl} alt="Promotion" style={{ width: '100%', maxWidth: '500px' }} />
                </div>
            ) : (
                <p>No promotion image found.</p>
            )}
        </div>
    );
}

export default PromoPage;
