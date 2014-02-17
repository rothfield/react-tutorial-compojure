(ns react_tutorial_compojure.handler
  (:use compojure.core)
  (:require [compojure.handler :as handler]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.middleware.params :refer [wrap-params]]
            [compojure.route :as route]))

(defn wrap-dir-index [handler]
  (fn [req]
    (handler
      (update-in req [:uri]
                 #(if (= "/" %) "/index.html" %)))))


(def  comments
  "Database of comments"
  (atom [{:author "Pete Hunt", :text "Hey there!"}]))

(defn get-comments[]
  {:body @comments })

(defn post-comment[author text]
  (swap! comments conj {:author author :text text})
  {:body @comments })

(defroutes app-routes
  (GET "/comments.json" [] 
       ;; GET . Return json data
       (get-comments))

  (POST "/comments.json" [author text]
        ;; Posted as a form submission, return json
        (post-comment author text))

  (route/resources "/")  ;; servers static files from resources/public
  (route/not-found "Not Found"))


(def app
  (->  app-routes
      wrap-params ;; without this, POST code doesn't work
      wrap-json-response  ;; Converts responses that are clojure objects to json. Without this, GET /comments.json won't return json.
      wrap-dir-index
      ))
