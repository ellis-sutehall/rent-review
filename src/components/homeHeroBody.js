import React, { useState } from "react"
import { navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

const HomeHeroBody = () => {
  const [search, setSearch] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    console.log(search)
    navigate("/results", { state: { search } })
  }
  return (
    <div className="hero-body">
      <div className="hero-search">
        <div className="columns is-centered">
          <div className="column is-half has-text-centered">
            <h2 className="title is-2">Find your ideal property</h2>
            <h3 className="title is-3">With help from the renting community</h3>
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-half">
            <form onSubmit={handleSubmit}>
              <div className="field has-addons">
                <p className="control has-icons-left">
                  <span className="icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                </p>
                <div className="control">
                  <input
                    className="input is-primary is-large has-text-centered"
                    type="text"
                    name="search"
                    placeholder="Enter Postcode"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className="control">
                  <button
                    className="button input is-large is-dark"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHeroBody
