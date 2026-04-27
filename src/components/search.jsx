import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColors, setSelectedColors] = useState({
    ironclad: false,
    silent: false,
    regent: false,
    defect: false,
    necrobinder: false,
    colorless: false,
  });

  const [selectedTypes, setSelectedTypes] = useState({
    attack: false,
    skill: false,
    power: false,
    status: false,
    curse: false,
    quest: false,
  });

  const [selectedRarities, setSelectedRarities] = useState({
    basic: false,
    common: false,
    uncommon: false,
    rare: false,
    ancient: false,
  });

  const query = useQuery({
    queryKey: ["cards", searchTerm],
    queryFn: async () => {
      const res = await fetch(
        `https://spire-codex.com/api/cards?name=${searchTerm}`,
      );

      if (!res.ok) throw new Error("Failed to fetch cards");
      return res.json();
    },
  });

  return (
    <div className="search-wrapper">
      <label htmlFor="search">Search Cards:</label>
      <input
        type="search"
        id="search"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <div className="filters">
        <label>Filter By: </label>
        <div>
          <label>Characters</label>
          <label>
            <input
              type="checkbox"
              checked={selectedColors.ironclad}
              onChange={(e) =>
                setSelectedColors({
                  ...selectedColors,
                  ironclad: e.target.checked,
                })
              }
            />
            Ironclad
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedColors.silent}
              onChange={(e) =>
                setSelectedColors({
                  ...selectedColors,
                  silent: e.target.checked,
                })
              }
            />
            Silent
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedColors.regent}
              onChange={(e) =>
                setSelectedColors({
                  ...selectedColors,
                  regent: e.target.checked,
                })
              }
            />
            Regent
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedColors.necrobinder}
              onChange={(e) =>
                setSelectedColors({
                  ...selectedColors,
                  necrobinder: e.target.checked,
                })
              }
            />
            Necrobinder
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedColors.defect}
              onChange={(e) =>
                setSelectedColors({
                  ...selectedColors,
                  defect: e.target.checked,
                })
              }
            />
            Defect
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedColors.colorless}
              onChange={(e) =>
                setSelectedColors({
                  ...selectedColors,
                  colorless: e.target.checked,
                })
              }
            />
            Colorless
          </label>
        </div>
        <div>
          <label>Card Type</label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.attack}
              onChange={(e) =>
                setSelectedTypes({
                  ...selectedTypes,
                  attack: e.target.checked,
                })
              }
            />
            Attack
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.skill}
              onChange={(e) =>
                setSelectedTypes({
                  ...selectedTypes,
                  skill: e.target.checked,
                })
              }
            />
            Skill
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.power}
              onChange={(e) =>
                setSelectedTypes({
                  ...selectedTypes,
                  power: e.target.checked,
                })
              }
            />
            Power
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.status}
              onChange={(e) =>
                setSelectedTypes({
                  ...selectedTypes,
                  status: e.target.checked,
                })
              }
            />
            Status
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.curse}
              onChange={(e) =>
                setSelectedTypes({
                  ...selectedTypes,
                  curse: e.target.checked,
                })
              }
            />
            Curse
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.quest}
              onChange={(e) =>
                setSelectedTypes({
                  ...selectedTypes,
                  quest: e.target.checked,
                })
              }
            />
            Quest
          </label>
        </div>
        <div>
          <label>Rarity</label>
          <label>
            <input
              type="checkbox"
              checked={selectedRarities.common}
              onChange={(e) =>
                setSelectedRarities({
                  ...selectedRarities,
                  common: e.target.checked,
                })
              }
            />
            Common
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedRarities.uncommon}
              onChange={(e) =>
                setSelectedRarities({
                  ...selectedRarities,
                  uncommon: e.target.checked,
                })
              }
            />
            Uncommon
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedRarities.rare}
              onChange={(e) =>
                setSelectedRarities({
                  ...selectedRarities,
                  rare: e.target.checked,
                })
              }
            />
            Rare
          </label>
        </div>
      </div>
      {!searchTerm && <div>Enter a card name to search</div>}
      {searchTerm && query.isLoading && <div>Searching...</div>}
      {query.isError && <div>Error searching cards</div>}
      {searchTerm && query.isSuccess && (
        <div>
          {(() => {
            const filteredCards = query.data.filter((card) => {
              const matchesName = String(card.name)
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

              const hasSelectedColors = Object.values(selectedColors).some(
                (v) => v,
              );
              const matchesColor =
                !hasSelectedColors || selectedColors[card.color.toLowerCase()];

              const hasSelectedTypes = Object.values(selectedTypes).some(
                (v) => v,
              );
              const matchesType =
                !hasSelectedTypes || selectedTypes[card.type.toLowerCase()];

              const hasSelectedRarities = Object.values(selectedRarities).some(
                (v) => v,
              );
              const matchesRarity =
                !hasSelectedRarities ||
                selectedRarities[card.rarity.toLowerCase()];

              return (
                matchesName && matchesColor && matchesType && matchesRarity
              );
            });
            return (
              <>
                <div>
                  Found {filteredCards.length} card
                  {filteredCards.length !== 1 ? "s" : ""}
                </div>
                <div className="cards-wrapper">
                  {filteredCards.map((card) => (
                    <div key={card.id} className="card">
                      {card.name} | {card.color} | {card.type} |{card.cost} Mana
                      |{card.star_cost && <span>{card.star_cost} Stars |</span>}
                      {card.rarity}
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
