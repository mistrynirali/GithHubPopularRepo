import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const responseStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    activeLanguageFilter: languageFiltersData[0].id,
    responseStatus: responseStatusConstants.initial,
  }

  componentDidMount() {
    this.getReposList()
  }

  getReposList = async () => {
    this.setState({responseStatus: responseStatusConstants.loading})
    const {activeLanguageFilter} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilter}`
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      this.onSuccess(data)
    } else {
      this.onFailure()
    }
  }

  onSuccess = data => {
    const updatedData = data.popular_repos.map(eachData => ({
      name: eachData.name,
      id: eachData.id,
      issuesCount: eachData.issues_count,
      forksCount: eachData.forks_count,
      starsCount: eachData.stars_count,
      avatarUrl: eachData.avatar_url,
    }))

    this.setState({
      reposList: updatedData,
      responseStatus: responseStatusConstants.success,
    })
  }

  onFailure = () => {
    this.setState({responseStatus: responseStatusConstants.failure})
  }

  changeFilter = id => {
    this.setState({activeLanguageFilter: id}, this.getReposList)
  }

  renderLanguageFilterItem = () => {
    const {activeLanguageFilter} = this.state

    return (
      <ul className="language-filters-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageDetails={eachLanguage}
            isActive={eachLanguage.id === activeLanguageFilter}
            changeFilter={this.changeFilter}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryItem = () => {
    const {reposList} = this.state

    return (
      <ul className="repo-list">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="went-wrong-text">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  view = () => {
    const {responseStatus} = this.state

    switch (responseStatus) {
      case responseStatusConstants.success:
        return this.renderRepositoryItem()
      case responseStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="main-heading">Popular</h1>
        {this.renderLanguageFilterItem()}
        {this.view()}
      </div>
    )
  }
}

export default GithubPopularRepos
