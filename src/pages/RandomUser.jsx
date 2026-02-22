import useFetch from "../hooks/useFetch";

function RandomUser() {
  const { data, loading, error, refetch } = useFetch(
    "https://randomuser.me/api/",
  );

  const user = data?.results?.[0];

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Random User Fetcher</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {user && !loading && (
        <div className="card">
          <img
            src={user.picture.large}
            alt="avatar"
            style={{ borderRadius: "50%" }}
          />
          <h2>
            {user.name.first} {user.name.last}
          </h2>
          <p>
            {user.location.city}, {user.location.country}
          </p>
        </div>
      )}

      <button onClick={refetch} style={{ marginTop: "20px" }}>
        Next User
      </button>
    </div>
  );
}

export default RandomUser;
