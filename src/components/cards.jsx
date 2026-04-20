import { useQuery } from "@tanstack/react-query";
export default function Cards() {
  const query = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await fetch("https://spire-codex.com/api/cards");
      if (!res.ok) throw new Error("Failed to fetch cards");
      return res.json();
    },
  });

  if (query.isLoading) return <div>Loading cards...</div>;
  if (query.isError) return <div>Error loading cards</div>;

  return (
    <div>
      <h1>Cards</h1>
      <ul>
        {query.data?.map((card) => (
          <li key={card.id}>
            {card.name} | {card.color} | {card.type} |{card.cost} Mana |
            {card.star_cost && <span>{card.star_cost} Stars</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
