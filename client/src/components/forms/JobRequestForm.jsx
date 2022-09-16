import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label, TextInput, Button, Textarea } from 'flowbite-react';
import { IndustrySelectDropdown } from './IndustrySelectDropdown';
import { CategorySelectDropdown } from './CategorySelectDropdown';

import { useForm } from '../../utils/hook';
import { useMutation } from '@apollo/react-hooks';

import { ADD_JOB } from '../../utils/mutations';

export function JobRequestForm() {
  let navigate = useNavigate();

  const [errors, setErrors] = useState();
  console.log('Errors', errors);

  function registerUserCallback() {
    console.log('addJobCallback');
    addJob();
  }
  const { onChange, onSubmit, values } = useForm(
    registerUserCallback,
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      industry: '',
      shipFrom: '',
      shipTo: '',
      category: '',
      description: '',
    }
  );

  // eslint-disable-next-line
  const [addJob, { loading }] = useMutation(ADD_JOB, {
    update(proxy, { data: { addJob: JobData } }) {
      navigate('/'); // respond with 'request received' message first
    },
    onError(graphQLErrors) {
      setErrors(graphQLErrors);
    },
    variables: { addInput: values },
  });

  return (
    <>
      <div className="mt-10 sm:mt-0 sm:w-1/2">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <div className="mb-2 block">
                      <Label htmlFor="firstname" value="First Name" />
                    </div>
                    <TextInput
                      onChange={onChange}
                      id="firstName"
                      type="text"
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <div className="mb-2 block">
                      <Label htmlFor="lastName" value="Last Name" />
                    </div>
                    <TextInput
                      onChange={onChange}
                      id="lastName"
                      type="text"
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                      onChange={onChange}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required={true}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <div className="mb-2 block">
                      <Label htmlFor="phone" value="Phone" />
                    </div>
                    <TextInput
                      onChange={onChange}
                      type="phone"
                      name="phone"
                      id="phone"
                      autoComplete="phone"
                      required={true}
                      maxLength="12"
                    />
                  </div>

                  <div className="col-span-6">
                    <div className="mb-2 block">
                      <Label htmlFor="industry" value="Industry" />
                    </div>
                    <IndustrySelectDropdown />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <div className="mb-2 block">
                      <Label htmlFor="shipFrom" value="Ship From" />
                    </div>
                    <TextInput
                      onChange={onChange}
                      name="shipFrom"
                      id="shipFrom"
                      type="text"
                      placeholder="Zip Code"
                      required={true}
                      maxLength="5"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <div className="mb-2 block">
                      <Label htmlFor="shipTo" value="Ship To" />
                    </div>
                    <TextInput
                      onChange={onChange}
                      name="shipTo"
                      id="shipTo"
                      type="text"
                      placeholder="Zip Code"
                      required={true}
                      maxLength="5"
                    />
                  </div>

                  <div className="col-span-6">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="category"
                        value="Items Category"
                      />
                    </div>
                    <CategorySelectDropdown />
                  </div>

                  <div className="col-span-6">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="description"
                        value="Items Description"
                      />
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Please describe the items you wish to ship..."
                      required={true}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <Button type="submit" onClick={onSubmit}>
                  Submit Request
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
