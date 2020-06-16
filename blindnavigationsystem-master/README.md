For the architecture of this application, refer to this article:
https://medium.com/the-andela-way/how-to-structure-a-react-native-app-for-scale-a29194cd33fc

Git

--Fork the repo in your private space
--Clone your fork to your local machine
--Perform a git remote -v ( in CLI). You should see something like the following:
               
                origin  https://gitlab.dell.com//blindnavigationsystem.git (fetch)
                origin  https://gitlab.dell.com//blindnavigationsystem.git (push)
                
--Add upstream by typing in the following

                git remote add upstream https://gitlab.dell.com/Akash_Sinha/blindnavigationsystem.git

--On performing git remote -v, you should see somthing like this:
               
                origin  https://gitlab.dell.com//blindnavigationsystem.git (fetch)
                origin  https://gitlab.dell.com//blindnavigationsystem.git (push)
                upstream        https://gitlab.dell.com/Akash_Sinha/blindnavigationsystem.git (fetch)
                upstream        https://gitlab.dell.com/Akash_Sinha/blindnavigationsystem.git (push)
                
--When you make any changes to the code, commit and push to your fork using (Git add. & git commit -m "message") 

                git push -u origin master
                
--Once the changes are reflected on your fork, go to Merge Requests on the left nav and create a new merge request.

--Keep your fork upto date:

                git fetch upstream
                git checkout master
                git rebase upstream/master
                git push -f origin master