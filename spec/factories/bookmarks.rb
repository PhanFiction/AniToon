FactoryBot.define do
  factory :bookmark do
    anime_id { "attack-on-titan-112" }
    mal_id { 16498 }
    name { "Attack on Titan" }
    poster { "https://cdn.noitatnemucod.net/thumbnail/300x400/100/debf027d032c6d40b91fab16b2ff9bd4.jpg" }
    description { "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.\n\nAfter witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Based on Hajime Isayama's award-winning manga, Shingeki no Kyojin follows Eren, along with his adopted sister Mikasa Ackerman and his childhood friend Armin Arlert, as they join the brutal war against the titans and race to discover a way of defeating them before the last walls are breached." }
    rating { "R" }
    duration { "24m" }
    association :user, factory: :user
  end
end