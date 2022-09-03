##############################################################################################
# Installation
##############################################################################################

# THIS HAS TO BE INSTALLED!
# python -m pip3 install clarifai-grpc

##############################################################################################
# Initialize the gRPC-based client to communicate with the Clarifai platform.
##############################################################################################

# Import the Clarifai gRPC-based objects needed
from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_pb2, status_code_pb2

# Construct the communications channel 
channel = ClarifaiChannel.get_grpc_channel()
# Construct the V2Stub object for accessing all the Clarifai API functionality
stub = service_pb2_grpc.V2Stub(channel)

##############################################################################################
# This is where you set up the metadata object that's used to authenticate. 
# This authorization will be used by every Clarifai API call.
# Change the following authorization key to your own credentials
# Example: metadata = (('authorization', 'Key ' + 'a123457612345678'),)
##############################################################################################
 
metadata = (('authorization', 'Key ' + 'b8911578e8a44e6cb55d77d9ea8bf5b7'),)
# Or, if you were to use an API Key:
# metadata = (('authorization', 'Key ' + 'YOUR_CLARIFAI_API_KEY_HERE'),)
# Yes, the word 'Key' appears in addition to the alphanumeric PAT or API Key

##############################################################################################
# A UserAppIDSet object is needed when using a PAT. It contains two pieces of information: 
# user_id (your user id) and app_id (app id that contains the model of interest). 
# Both of them are specified as string values.
##############################################################################################

userDataObject = resources_pb2.UserAppIDSet(user_id='tys7osid3e3x', app_id='b8911578e8a44e6cb55d77d9ea8bf5b7')

########################################################################################
# In this section, we set the user authentication, app ID, model details, and the URL
# of the image we want as an input. Change these strings to run your own example.
#######################################################################################

import sys

USER_ID = 'tys7osid3e3x'
# Your PAT (Personal Access Token) can be found in the portal under Authentification
PAT = 'da23de69a7254059b0bcab59af895374'
APP_ID = 'whatthefood'
# Change these to whatever model and image URL you want to use
MODEL_ID = 'general-image-recognition'
IMAGE_FILE_LOCATION = 'YOUR_IMAGE_FILE_LOCATION_HERE'
#IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvwE4U5NvkAnUlPZVAU6ZNuQc3RhpWo0Fxbw&usqp=CAU'
IMAGE_URL = str(sys.argv[1])
# This is optional. You can specify a model version or the empty string for the default
MODEL_VERSION_ID = ''

############################################################################
# YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
############################################################################

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2

channel = ClarifaiChannel.get_grpc_channel()
stub = service_pb2_grpc.V2Stub(channel)

metadata = (('authorization', 'Key ' + PAT),)

userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

post_model_outputs_response = stub.PostModelOutputs(
    service_pb2.PostModelOutputsRequest(
        user_app_id=userDataObject,  # The userDataObject is created in the overview and is required when using a PAT
        model_id=MODEL_ID,
        version_id=MODEL_VERSION_ID,  # This is optional. Defaults to the latest model version
        inputs=[
            resources_pb2.Input(
                data=resources_pb2.Data(
                    image=resources_pb2.Image(
                        url=IMAGE_URL
                    )
                )
            )
        ]
    ),
    metadata=metadata
)
if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
    print(post_model_outputs_response.status)
    raise Exception("Post model outputs failed, status: " + post_model_outputs_response.status.description)

# Since we have one input, one output will exist here
output = post_model_outputs_response.outputs[0]

print("Predicted concepts:")
for concept in output.data.concepts:
    print("%s %.2f" % (concept.name, concept.value))
print("Top guess: " + output.data.concepts[0].name)

# Uncomment this line to print the full Response JSON
#print(output)