import { useQuery } from "@tanstack/react-query";

export default function Cards() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cardsWithImages"],
    queryFn: async () => {
      const [cardsRes, imagesRes] = await Promise.all([
        fetch("https://spire-codex.com/api/cards"),
        fetch("https://spire-codex.com/api/images"),
      ]);

      if (!cardsRes.ok || !imagesRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const cards = await cardsRes.json();
      const imageData = await imagesRes.json();

      // 🔹 Step 1: get the "cards" image group
      const cardImagesGroup = imageData.find((group) => group.id === "cards");

      const images = cardImagesGroup?.images || [];

      // 🔹 Step 2: helper to normalize names
      const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

      // 🔹 Step 3: merge
      const merged = cards.map((card) => {
        const match = images.find(
          (img) =>
            normalize(img.filename.replace(".webp", "")) ===
            normalize(card.name),
        );

        return {
          ...card,
          imageUrl: match ? `https://spire-codex.com${match.url}` : null,
        };
      });

      return merged;
    },
  });

  if (isLoading) return <div>Loading cards...</div>;
  if (isError) return <div>Error loading cards</div>;

  return (
    <div>
      <h1>Cards</h1>
      <div className="cards-wrapper">
        {data.map((card) => (
          <div key={card.id} className="card">
            {card.imageUrl && (
              <img src={card.imageUrl} alt={card.name} width={200} />
            )}

            <p>
              {card.name} | {card.color} | {card.type} | {card.cost} Mana |
              {card.star_cost && <span> {card.star_cost} Stars |</span>}{" "}
              {card.rarity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
