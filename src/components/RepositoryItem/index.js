import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    name,
    issuesCount,
    forksCount,
    starsCount,
  } = repositoryDetails

  return (
    <li>
      <div className="card-container">
        <div>
          <img src={avatarUrl} alt={name} className="avatar-img" />
          <h1 className="name">{name}</h1>
        </div>
        <div className="count-container">
          <p className="star-count">
            <span>
              <img
                src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                alt="stars"
                className="star-image"
              />
            </span>
            {starsCount} Star
          </p>
        </div>
        <div className="count-container">
          <p className="star-count">
            <span>
              <img
                src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
                alt="forks"
                className="star-image"
              />
            </span>
            {forksCount} Frok
          </p>
        </div>
        <div className="count-container">
          <p className="star-count">
            <span>
              <img
                src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
                alt="open issues"
                className="star-image"
              />
            </span>
            {issuesCount} Open Issues
          </p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
