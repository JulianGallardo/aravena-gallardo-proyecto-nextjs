

import { PromoExtendida } from "@/lib/definitions";
import Carousel from "./carrouselRecomendedBurgers";
import { fetchAllBurgers, fetchAllPromos } from "@/lib/crud";
import { getImageUrl } from "@/utils/cloudinaryUtils";


export default async function ServerCarousel() {

    const recommendedBurgers = await fetchAllBurgers().then((data) =>
        data.sort(() => Math.random() - 0.5).slice(0, 5)
    );
    const recommendedBurgersImage = await Promise.all(recommendedBurgers.map(async (burger) => {
        const url = await getImageUrl(burger.name);
        return { burger, cloudinaryImageUrl: url };
    }));

    const recommendedPromos = await fetchAllPromos().then((data) =>
        data.sort(() => Math.random() - 0.5).slice(0, 5)
    );
    const recommendedPromosImage = await Promise.all(recommendedPromos.map(async (promo) => {
        const url = await getImageUrl(promo.name);
        return { promo, cloudinaryImageUrl: url };
    }));



    return (
        <Carousel recommendedBurgers={recommendedBurgersImage} recommendedPromos={recommendedPromosImage} />
    );
}