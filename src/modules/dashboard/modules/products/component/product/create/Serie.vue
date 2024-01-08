<script setup lang="ts">
import { ref } from 'vue';

const tab = ref(null);
const show2 = ref(true);
const show3 = ref(true);
const select = ref('');
const location = ref(['India', 'United Kingdom', 'Srilanka']);

/*Language Select*/
const selectlng = ref();
const language = ref(['English', 'French']);
</script>

<template>
    <div class="">
        <v-tabs v-model="tab" bg-color="transparent" color="primary">
            <v-tab value="PersonalInfo" class="text-medium-emphasis">Personal Info</v-tab>
            <v-tab value="AccountDetails" class="text-medium-emphasis">Account Details</v-tab>
            <v-tab value="SocialLinks" class="text-medium-emphasis">Social Links</v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
            <v-window v-model="tab">
                <v-window-item value="PersonalInfo">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">First Name</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <VTextField color="primary" type="text" placeholder="John" hide-details></VTextField>
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Country</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <VSelect v-model="select" :items="location" single-line hide-details label="Select location"></VSelect>
                                </v-col>
                            </v-row>
                            <v-row class="align-center">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Birth Date</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <VTextField color="primary" type="date" hide-details></VTextField>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Last Name</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field color="primary" variant="outlined" type="text" placeholder="Doe" hide-details />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Language</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <VSelect v-model="selectlng" :items="language" single-line hide-details></VSelect>
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Phone no</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="123 4567 201"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n6">
                            <v-row class="align-center">
                                <v-col cols="12" sm="9" offset-sm="3">
                                    <v-btn color="primary" flat>Submit</v-btn>
                                    <v-btn class="bg-lighterror text-error ml-4" flat>Cancel</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-window-item>
                <v-window-item value="AccountDetails">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">User Name</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field color="primary" variant="outlined" type="text" placeholder="John" hide-details />
                                </v-col>
                            </v-row>
                            <v-row class="align-center">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Password</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        :type="show2 ? 'text' : 'password'"
                                        placeholder="john.deo"
                                        hide-details
                                        class="text-subtitle-1"
                                        :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append-inner="show2 = !show2"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Email</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="email"
                                        placeholder="john.deo"
                                        suffix="@example.com"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Confirm</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        :type="show3 ? 'text' : 'password'"
                                        placeholder="john.deo"
                                        hide-details
                                        class="text-subtitle-1"
                                        :append-inner-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append-inner="show3 = !show3"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n6">
                            <v-row class="align-center">
                                <v-col cols="12" sm="9" offset-sm="3">
                                    <v-btn color="primary" flat>Submit</v-btn>
                                    <v-btn class="bg-lighterror text-error ml-4" flat>Cancel</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-window-item>
                <v-window-item value="SocialLinks">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Twitter</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://twitter.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Google</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://plus.google.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Instagram</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://instagram.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Facebook</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://facebook.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Linkedin</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://Linkedin.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Quora</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://Quora.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n6">
                            <v-row class="align-center">
                                <v-col cols="12" sm="9" offset-sm="3">
                                    <v-btn color="primary" flat>Submit</v-btn>
                                    <v-btn class="bg-lighterror text-error ml-4" flat>Cancel</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-window-item>
                <v-window-item value="SocialLinks">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Twitter</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://twitter.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Google</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://plus.google.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Instagram</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://instagram.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Facebook</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://facebook.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Linkedin</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://Linkedin.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Quora</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://Quora.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n6">
                            <v-row class="align-center">
                                <v-col cols="12" sm="9" offset-sm="3">
                                    <v-btn color="primary" flat>Submit</v-btn>
                                    <v-btn class="bg-lighterror text-error ml-4" flat>Cancel</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-window-item>
                <v-window-item value="SocialLinks">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Twitter</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://twitter.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Google</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://plus.google.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Instagram</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://instagram.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Facebook</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://facebook.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Linkedin</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://Linkedin.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Quora</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://Quora.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n6">
                            <v-row class="align-center">
                                <v-col cols="12" sm="9" offset-sm="3">
                                    <v-btn color="primary" flat>Submit</v-btn>
                                    <v-btn class="bg-lighterror text-error ml-4" flat>Cancel</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-window-item>
                <v-window-item value="SocialLinks">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Twitter</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://twitter.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Google</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://plus.google.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Instagram</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://instagram.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Facebook</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://facebook.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Linkedin</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://Linkedin.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="align-center mb-3">
                                <v-col cols="12" sm="3" class="pb-sm-3 pb-0">
                                    <v-label class="font-weight-medium">Quora</v-label>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="https://Quora.com/abc"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="mt-n6">
                            <v-row class="align-center">
                                <v-col cols="12" sm="9" offset-sm="3">
                                    <v-btn color="primary" flat>Submit</v-btn>
                                    <v-btn class="bg-lighterror text-error ml-4" flat>Cancel</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-window-item>
            </v-window>
        </v-card-text>
    </div>
</template>

<style scoped></style>
