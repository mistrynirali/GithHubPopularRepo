import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, changeFilter} = props
  const {language, id} = languageDetails

  const onUpdate = () => changeFilter(id)

  const activeClass = isActive ? 'active-filter' : ''
  return (
    <li className="list-container">
      <button
        type="button"
        onClick={onUpdate}
        disabled={isActive}
        className={`filter-button ${activeClass}`}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
