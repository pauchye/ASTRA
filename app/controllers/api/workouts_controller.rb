class Api::WorkoutsController < ApplicationController

    def index
        
        if params.has_key?(:user_id)
            # index of nested resource
            
            @workouts = Workout.where(user_id: params[:user_id])
            
        else
            # index of top-level resource
            @workouts = Workout.all

        end
        render :index
    end

    def show
        @workout = Workout.find(params[:id])
        render :show
    end

    def create
        
        @workout = Workout.new(workout_params)
        
        if @workout.save
            render :show
        else
            render json: @workout.errors.full_messages, status: 401
        end
    end

    def update
        
        @workout = Workout.find(params[:id])
        if @workout.update(workout_params)
            
            render :show
        else
            render json: @workout.errors.full_messages, status: 401
        end
    end

    def destroy
        
        @workout = Workout.find(params[:id])
        
        if @workout
            
            @workout.destroy
        else
            render json: ['Could not locate workout'], status: 400
        end
    end

    def workout_params
        
        params.require(:workout).permit(:user_id, :route_id, :distance, :duration, :sport, :type, :date, :time, :title, :description)
    end

end