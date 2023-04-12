import { FrameHexagon, Table } from "@arwes/core"
import { useQuery } from "react-query"
import { useAutoScroll } from "./useAutoScroll"
import "./Leaderboard.css"

export interface Challenge {
  id: number
  name: string
  difficulty: number
}

export interface Team {
  id: number
  name: string
  solvedChallengeIds: number[]
}

export interface LeaderboardData {
  challenges: Challenge[]
  teams: Team[]
}

export const Leaderboard: React.FC = () => {
  const { isLoading, error, data } = useQuery<LeaderboardData>(
    'leaderboardData',
    () => fetch('https://hacking-night-backend.netlify.app/.netlify/functions/leaderboard').then(res =>res.json()),
    { refetchInterval: 5000 }
  )

  useAutoScroll()

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (error || !data) {
    return <span>Error: {"" + error}</span>
  }
  if (data.teams.length === 0) {
    return <span>Nicht aktiv, warte auf die nächste Hacking Night!</span>
  } 

  const columnWidths = ["20%", ...data.teams.map((t) => `${80 / data.teams.length}%`)]

  const headers = [
    { id: "challenge", data: "Challenge" },
    ...data.teams.map((team) => ({ id: team.id, data: team.name })),
  ]

  const dataset = data.challenges.map((challenge) => ({
    id: challenge.id,
    columns: [
      { id: "challenge", data: <ChallengeComponent challenge={challenge} key={challenge.id} /> },
      ...data.teams.map((team) => ({
        id: team.id,
        data: (
          <SolvedComponent solved={team.solvedChallengeIds.includes(challenge.id)} key={team.id} />
        ),
      })),
    ],
  }))

  return (
    <div>
      <Table
        headers={headers}
        dataset={dataset}
        columnWidths={columnWidths}
        animator={{ animate: false /* With animation, updating the content doesn#t work... */ }}
      />
    </div>
  )
}

const ChallengeComponent: React.FC<{ challenge: Challenge }> = (props) => {
  const { difficulty, name } = props.challenge
  return (
    <div style={{ display: "flex", height: 42, alignItems: "center", gap: 16 }}>
      <div style={{ width: 70, textAlign: "center" }}>
        {new Array(difficulty).fill(0).map((_, i) => (
          <span key={i}>
            ⭐{(difficulty === 4 && i === 1) || (difficulty > 4 && i == 2) ? <br /> : null}
          </span>
        ))}
      </div>
      <div style={{ fontSize: 16 }}>{name}</div>
    </div>
  )
}

const SolvedComponent: React.FC<{ solved: boolean }> = ({ solved }) => {
  return solved ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* @ts-ignore */}
      <FrameHexagon palette="success">✔</FrameHexagon>
    </div>
  ) : null
}