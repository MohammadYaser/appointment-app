class Api::V1::EngineersController < ApplicationController
  def index
    @engineers = Engineer.select(:id, :name, :speciality, :photo).all
    if @engineers.empty?
      render json: { message: 'No engineers found' }
    else
      render json: @engineers
    end
  end

  def show
    @engineer = Engineer.find(params[:id])
    if @engineer
      render json: @engineer.select(:id, :name, :speciality, :photo, :consultancy_fee)
    else
      render json: { error: 'Engineer not found' }
    end
  end

  def create
    @engineer = Engineer.new(engineer_params)
    if @engineer.save
      render json: @engineer, status: :created
    else
      render json: { error: 'Unable to create engineer' }
    end
  end

  def destroy
    @engineer = Engineer.find(params[:id])
    if @engineer.destroy
      render json: { message: 'Engineer deleted' }
    else
      render json: { error: 'Unable to delete engineer' }
    end
  end

  private

  def engineer_params
    params.require(:engineer).permit(:name, :speciality, :photo, :consultancy_fee, :about)
  end
end
