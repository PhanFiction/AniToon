Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do
    get 'user_signed_in', to: 'users#user_signed_in'
    resources :bookmarks, only: [:index, :create, :destroy]

    scope '/anime' do
      get 'episodes/:id', to: 'animes#episodes'
      get 'genre/:id', to: 'animes#genre'
      get 'category/:id', to: 'animes#category'
      post 'episodes/:id/comments', to: 'comments#create', as: :create_comment
    end

    resources :animes, path: 'anime', only: [:index] do
      collection do
        get 'info'
        get 'search'
        get 'search_suggest'
        get 'episode'
        get 'episode_server'
      end
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
