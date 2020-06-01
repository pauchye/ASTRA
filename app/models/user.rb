class User < ApplicationRecord
    class User < ApplicationRecord 
        validates :username, presence: true, uniqueness: true
        validates :password_digest, :session_token, presence: true
        validates :password, length: { minimum: 6 }, allow_nil: true
    
        attr_reader :password
        after_initialize :ensure_session_token 
    
        def self.find_by_credentials(username, password)
            user = User.find_by(username: username)
            return nil unless user && user.is_password?(password)
            user
        end
    
        def is_password?(this_password)
            bpass = BCrypt::Password.new(self.password_digest)
            bpass.is_password?(this_password)
        end
    
        def self.generate_session_token 
            SecureRandom::urlsafe_base64
        end
    
        def password=(new_password)
            @password = new_password
            self.password_digest = BCrypt::Password.create(new_password)
        end
    
        def ensure_session_token
            self.session_token ||= self.class.generate_session_token
        end
    
        def reset_session_token!
            token = self.class.generate_session_token
            self.update!(session_token: token)
            self.session_token
        end
    
    end
end
