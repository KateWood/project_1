angular
    .module('myApp')
        .controller("ChatController", ChatController)

        // injects $firebaseArray
        ChatController.$inject = ['$firebaseArray'];

        /*
         ChatController function -- must contain everything for the controller
        */
        function ChatController ($firebaseArray) {
            
            // variable capture
            var self = this;

            // attaches addChat function to the controller
            self.addChat = addChat; 

            // sets chatter IDs as false
            self.chatter1 = false;
            self.chatter2 = false;

            // attaches getMyChatId to controller
            self.getMyChatId = getMyChatId;

            // gets boxes array from firebase and attaches it to the controller
            self.chats = (function(){
                var ref = new Firebase('https://tictactoekate.firebaseio.com/chats');
                var chats = $firebaseArray(ref);
                return chats;
            })();

            // adds chat to Firebase array
            function addChat(){
            	self.getMyChatId();
            	self.chats.$add({message: self.text});
            	self.text = null;
        	}

            // sets chatter id
            function getMyChatId(){
            	if (self.chatter1 || self.chatter2) {
            		return;
            	}
            	if (self.chats.chatter1 === false) {
            		self.chatter1 = true;
            		self.chats.chatter1 = true;
            		self.chats.$save(self.chats);
            		return;
            	}
            	if (self.chats.chatter2 === false) {
            		self.chatter2 = true;
            		self.chats.chatter2 = true;
            		self.chats.$save(self.chats);
            		return;
            	}
            }

        }