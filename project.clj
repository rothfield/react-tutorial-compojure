(defproject doremi-server "0.1.0-SNAPSHOT"
  :description "Version of reactjs tutorial implemented in clojure/compojure"
  :url "http://github.com/rothfield/react-tutorial-compojure"
  :dependencies [
                 [org.clojure/clojure "1.5.1"]
                 [compojure "1.1.6"]
                [ring/ring-json "0.2.0"]
                 [ring/ring-jetty-adapter "1.2.0"] 
                 ]
  :plugins [[lein-ring "0.8.10"]]
  ;; You can run the standalone jar as follows
  ;; java -jar target/doremi-script-standalone.jar
  ;; It will run the main function in doremi_core
  ;; :main doremi_script.doremi_core 
  :jar-name "react-tutorial-compojure.jar"
  :uberjar-name "react-tutorial-compojure-standalone.jar"
  :ring {:handler react_tutorial_compojure.handler/app}
  :profiles { :uberjar {:aot :all}
             :dev {:dependencies [
                                  [javax.servlet/servlet-api "2.5"]
                                  [ring-mock "0.1.5"]]}})
