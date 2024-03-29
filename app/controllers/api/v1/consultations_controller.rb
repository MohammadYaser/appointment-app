class Api::V1::ConsultationsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[create]

  def index
    @consultations = current_user.consultations.includes(:user, :engineer).select(:id, :user_id, :engineer_id, :city,
                                                                                  :date).all
    if @consultations.empty?
      render json: { message: 'No consultations found' }
    else
      consultations_data = @consultations.map do |consultation|
        {
          id: consultation.id,
          user_name: consultation.user&.username,
          engineer_name: consultation.engineer&.name,
          city: consultation.city,
          date: consultation.date
        }
      end
      render json: { data: consultations_data }
    end
  end

  def create
    @consultation = Consultation.new(consultation_params)
    if @consultation.save
      render json: { data: @consultation }, status: :created
    else
      render json: { error: 'Unable to create consultation' }
    end
  end

  def destroy
    @consultation = Consultation.find(params[:id])
    if @consultation.destroy
      render json: { message: 'Consultation deleted' }
    else
      render json: { error: 'Unable to delete consultation' }
    end
  end

  private

  def consultation_params
    params.require(:consultation).permit(:user_id, :engineer_id, :date, :city)
  end
end
